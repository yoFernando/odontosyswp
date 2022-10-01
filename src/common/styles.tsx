import { StyleSheet } from 'react-native'
import { Theme } from '../paper/config'

export function intToColor(int: number){
    if(!int) return '#ffffff'

    int >>>= 0;
    let b = int & 0xFF,
        g = (int & 0xFF00) >>> 8,
        r = (int & 0xFF0000) >>> 16
    return "rgb(" + [r, g, b].join(",") + ")";
}

const styles = StyleSheet.create({
    grow: {
        flexGrow: 1,
        height: '100%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    bgPrimary: {
        backgroundColor: Theme.colors.primary
    },
    paddingVertical5: {
        paddingVertical: 5
    },
    paddingVertical10: {
        paddingVertical: 10
    },
    paddingVertical20: {
        paddingVertical: 20
    }
})

export default styles