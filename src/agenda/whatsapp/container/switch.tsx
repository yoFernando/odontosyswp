import React, { MutableRefObject } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';

function AgendaSwitchModal({ modalRef }: { modalRef: MutableRefObject<BottomSheetModal> }) {
    return (
        <BottomSheet
            index={1}
            ref={modalRef}
            snapPoints={['50%', '100%']}
            // onChange={handleSheetChanges}
        >
            <View>
                <Text>Awesome 🎉</Text>
            </View>
        </BottomSheet>
    );
}

export default AgendaSwitchModal;