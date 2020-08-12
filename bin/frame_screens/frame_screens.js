const { execSync } = require('child_process');
const {
    copyFileSync,
    existsSync,
    mkdirSync,
    readdirSync,
    statSync,
    writeFileSync,
} = require('fs');
const path = require('path');

const config = require('./config.json');
const { platform } = require('os');
const { dirname } = require('path');

const EXPECTED_DIRECTORIES = ['android', 'ios 5.5', 'ios 6.5'];
const STRING_EXTENSION = '.strings';

function copyRecursiveSync(source, destination) {
    var exists = existsSync(source);
    var stats = exists && statSync(source);
    var isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        mkdirSync(destination);
        readdirSync(source).forEach((childItemName) => {
            copyRecursiveSync(
                path.join(source, childItemName),
                path.join(destination, childItemName),
            );
        });
    } else {
        copyFileSync(source, destination);
    }
}

function createFontConfig(fontConfigs) {
    const fonts = {}
    const entries = Object.entries(fontConfigs);

    entries.forEach(([lang, font]) => {
        if (!fonts[font]) {
            fonts[font] = [];
        }
        fonts[font].push(lang);
    });

    return Object.entries(fonts).map(([font, supported]) => ({
        font: './fonts/' + font,
        supported,
    }));
}

function createScreenshotDataConfig(config) {
    const fonts = createFontConfig(config.fonts);

    return config.screenshots.map(data => {
        if (data.has_title !== undefined && !data.has_title) {
            return {
                filter: data.key
            };
        }

        return {
            filter: data.key,
            title_below_image: data.title_below_image,
            title: {
                fonts,
                font_size: config.font_size,
                color: config.color,
            }
        };
    })
}

function createFrameFileConfig(config, platformDir) {
    return {
        default: {
            background: config.background,
            force_device_type: config.frame[platformDir],
            padding: config.padding,
            title_min_height: "30%"
        },
        data: createScreenshotDataConfig(config),
    };
}

function getFiles(source, filter) {
    return readdirSync(source, { withFileTypes: true })
        .filter(filter)
        .map(dirent => dirent.name);
}

function getDirectories(source) {
    const filterDirectories = dirent => dirent.isDirectory();
    return getFiles(source, filterDirectories);
}

function getStringFiles(source) {
    const filterStringFiles = dirent => path.extname(dirent.name) === STRING_EXTENSION;
    return getFiles(source, filterStringFiles);
}

function getImageFiles(source) {
    const filterImageFiles = dirent => ['.jpg', '.png'].includes(path.extname(dirent.name));
    return getFiles(source, filterImageFiles);
}

function main() {
    const platformDirectories = getDirectories(__dirname).filter(dir => EXPECTED_DIRECTORIES.includes(dir));
    console.log(platformDirectories)

    const stringFiles = getStringFiles(path.join(__dirname, 'strings'));

    const missingDirectories = EXPECTED_DIRECTORIES.filter(dir => !platformDirectories.includes(dir));

    if (missingDirectories.length > 0) {
        console.log(
            'The working folder is missing the following screenshots directory: ',
            missingDirectories.join(','),
        );
    }

    platformDirectories.forEach(platformDirectory => {
        const languageDirs = getDirectories(path.join(__dirname, platformDirectory));
        let generate = false;

        languageDirs.forEach(langDir => {
            const images = getImageFiles(path.join(__dirname, platformDirectory, langDir));
            const langFile = stringFiles.find(stringFile => stringFile.includes(langDir));

            if (!langFile) {
                console.log(
                    `Skipping generation of framed screenshots for ${platformDirectory}/${langDir} directory. string file missing`,
                );
                return;
            }

            if (!images.length) {
                console.log(
                    `Skipping generation of framed screenshots for ${platformDirectory}/${langDir} directory. No images found.`,
                );
                return;
            }

            generate = true;

            console.log('Processing ' + langFile)
            copyFileSync(
                path.join(__dirname, 'strings', langFile),
                path.join(__dirname, platformDirectory, langDir, 'title.strings'),
            );
        });

        if (generate) {
            console.log('here generate')
            const frameFileConfig = createFrameFileConfig(config, platformDirectory);

            console.log('Generating Framefile.json for ' + platformDirectory);
            writeFileSync(
                path.join(__dirname, platformDirectory, 'Framefile.json'),
                JSON.stringify(frameFileConfig)
            );

            console.log('Copying background image to ' + platformDirectory)
            copyFileSync(
                path.join(__dirname, 'background.png'),
                path.join(__dirname, platformDirectory, 'background.png')
            );

            console.log('Copying fonts to ' + platformDirectory);
            copyRecursiveSync(
                path.join(__dirname, 'fonts'),
                path.join(__dirname, platformDirectory, 'fonts')
            );

            console.log(
                `Generating screenshots for ${platformDirectory}. This is gonna take a few minutes...`
            );

            execSync(
                'fastlane frameit',
                {
                    stdio: 'inherit',
                    cwd: path.join(__dirname, platformDirectory),
                },
            );
        }
    });
}

main();
