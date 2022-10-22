import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { IChildren } from '../common/types';
import SnackBarContext from './snackbar/context';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#014990",
    secondary: "#56004e",
    danger: '#db1c2c',
    // --color-primary: #;
    // --color-primary-alt: #00aeef;
    // --color-secondary: #;
    // --color-secondary-alt: #a1a1a1;
    // --color-ground: #7e8083;
    // --color-shadow: #e1e1e1;
    // --color-danger: #db1c2c;
    // --color-warning: #ffd200;
    // --color-success: #009688;
  },
};

function PaperAppContainer(props: IChildren) {
  return (
    <PaperProvider theme={Theme}>
      <SnackBarContext>
        {props.children}
      </SnackBarContext>
    </PaperProvider>
  );
}

export { Theme }
export default PaperAppContainer