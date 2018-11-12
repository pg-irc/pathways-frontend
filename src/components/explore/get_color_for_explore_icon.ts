import { colors } from '../../application/styles';

export const getColorForExploreIcon = (icon: string): string => {
    switch (icon) {
        case 'street-view':
            return colors.turquoiseBlue;
        case 'building':
            return colors.orange;
        case 'dollar':
            return colors.aquaMarine;
        case 'heartbeat':
            return colors.vermillion;
        case 'graduation-cap':
            return colors.blueGreenDark;
        case 'handshake-o':
            return colors.melon;
        case 'briefcase':
            return colors.sepia;
        case 'balance-scale':
            return colors.purple;
        default:
        case 'car':
            return colors.blueGreen;

    }
};
