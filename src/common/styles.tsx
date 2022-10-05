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
    },
    h100: {
        height: '100%',
    },
    bold: {
        fontWeight: 'bold'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    shrink: {
        flexShrink: 1,
    },
    nowrap: {
        flexWrap: 'nowrap'
    },
    wrap: {
        flexWrap: 'wrap'
    },
    justify: {
        justifyContent: 'center'
    },
    middle: {
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
    },
    divider: {
        height: 1,
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
    paddingVertical15: {
        paddingVertical: 15
    },
    paddingVertical20: {
        paddingVertical: 20
    },
    paddingHorizontal5: {
        paddingHorizontal: 5
    },
    paddingHorizontal10: {
        paddingHorizontal: 10
    },
    paddingHorizontal15: {
        paddingHorizontal: 15
    },
    paddingHorizontal20: {
        paddingHorizontal: 20
    }
})

export default styles