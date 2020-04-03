// tslint:disable:no-expression-statement
import { textStyles, applicationStyles } from './styles';
import { Toast } from 'native-base';

export const showToast = (text: string): void => {
    const toastProps = {
        style: applicationStyles.toast,
        textStyle: textStyles.toast,
        duration: 2000,
    };
    Toast.show({
        ...toastProps,
        text,
    });
};