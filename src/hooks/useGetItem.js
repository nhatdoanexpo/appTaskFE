import AsyncStorage from "@react-native-async-storage/async-storage";

const useGetItem = async (item) => {
    try {
        const jsonValue = await AsyncStorage.getItem(item)
        return jsonValue 
      } catch(e) {
        //
      }
}

export default useGetItem;