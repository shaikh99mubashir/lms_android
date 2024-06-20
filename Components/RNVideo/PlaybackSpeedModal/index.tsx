import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Color} from '../../../Constant';
import Entypo from 'react-native-vector-icons/Entypo';

const PlaybackSpeedModal = ({
  playbackSpeed,
  playbackRate,
  setPlaybackRate,
  playbackModalVisible,
  setPlaybackModalVisible,
}: any) => {
  console.log('playbackSpeed0 comp', playbackSpeed);
  console.log('playbackRate comp', playbackRate);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={playbackModalVisible}
      onRequestClose={() => setPlaybackModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.modalTitle}>Playback Speed</Text>
            <TouchableOpacity onPress={() => setPlaybackModalVisible(false)}>
              <Entypo name="cross" color={Color.white} size={25} />
            </TouchableOpacity>
          </View>
          <ScrollView style={{maxHeight: 300}}>
            {playbackSpeed?.map((rate: any, index: any) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => {
                  setPlaybackRate(rate);
                  setPlaybackModalVisible(false);
                }}
                style={[
                  styles.modalOption,
                  {
                    backgroundColor:
                      playbackRate === rate ? 'rgba(0,0,0,0.5)' : 'transparent',
                  },
                ]}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: playbackRate === rate ? 'bold' : 'normal',
                  }}>
                  {rate == 1 ? 'Normal' : rate}
                </Text>
                {playbackRate === rate && (
                  <Entypo name="check" color={Color.white} size={20}/>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'rgb(49, 49, 48)',
    borderRadius: 10,
    padding: 20,
    maxHeight: 400,
    
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Circular Std Medium',
    marginBottom: 20,
    color: Color.white,
  },
  modalOption: {
    padding: 10,
    marginVertical: 5,
    flexDirection:'row',
    justifyContent:'space-between',
    borderRadius: 5,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default PlaybackSpeedModal;
