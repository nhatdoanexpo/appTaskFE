import React from 'react'
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native'

export default function Loadingcontent({ loading,children, ...props }) {

    return (
        <>
            {
                loading ? (
                    <Modal
                    transparent={true}
                    style={{
                        flex : 1,
                    }}
                    >
                        <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" />
                        </View>
                    </Modal>
                )
                    : <></>
            }
            {children}
        </>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    horizontal: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
});