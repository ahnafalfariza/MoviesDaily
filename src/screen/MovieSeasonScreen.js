import React, { useState, useEffect, useRef, useCallback } from "react";
import { Text, View, FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";

import Screen from "../component/Screen";
import { request } from "../api/api";
import { getTvShowSeasonUrl, getImageUrl } from "../api/url";
import { Styles } from "../component/MovieDetail/Styles";
import { white, orange } from "../helper/Color";
import BackIcon from "../component/Utils/BackIcon";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const MovieSeasonScreen = ({ route, navigation }) => {
  const { season, movieid, listSeason } = route.params;
  const [dataSeason, setDataSeason] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [seasonNumber, setSeasonNumber] = useState(season.season_number);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const seasonListRef = useRef(null);

  const fetchSeasonData = useCallback(async (sn) => {
    setDataSeason((prev) => {
      if (!prev[sn]) {
        request(getTvShowSeasonUrl(movieid, sn)).then((result) => {
          if (result) {
            setDataSeason((prevData) => {
              const newData = [...prevData];
              newData[sn] = result;
              return newData;
            });
            setIsLoaded(true);
            setSeasonNumber(sn);
          }
        });
      } else {
        setIsLoaded(true);
        setSeasonNumber(sn);
      }
      return prev;
    });
  }, [movieid]);

  useEffect(() => {
    fetchSeasonData(season.season_number);
  }, [fetchSeasonData, season.season_number]);

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const onPressSeason = (index) => {
    fetchSeasonData(index);
    toggleModal();
  };

  const handleOnScroll = (event) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = (p) => {
    if (seasonListRef.current) {
      seasonListRef.current.scrollTo(p);
    }
  };

  const seasonEpisode = (data) => {
    const imageUrl = getImageUrl(data.still_path, "uri", "w500");
    return (
      <View style={{ margin: 8, backgroundColor: white, overflow: "hidden", flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={[Styles.imagePlaceholder, { height: 90, width: 160 }]}>
            <Image source={imageUrl} style={{ height: 90, width: 160 }} />
          </View>
          <View style={{ flex: 1, padding: 12, justifyContent: "center" }}>
            <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 14 }}>{`Episode ${data.episode_number}`}</Text>
            <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 18 }} numberOfLines={2}>
              {data.name}
            </Text>
            <View style={{ width: 30, height: 5, backgroundColor: orange, marginTop: 4 }} />
          </View>
        </View>
        <Text
          style={{ fontFamily: "Montserrat-Regular", fontSize: 14, paddingVertical: 8, textAlign: "justify" }}
          numberOfLines={4}
        >
          {data.overview}
        </Text>
      </View>
    );
  };

  const seasonTab = (item, index) => {
    return (
      <View style={{ margin: 8, flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => onPressSeason(index)}>
          <Text
            style={{
              fontFamily: seasonNumber === index ? "Montserrat-Bold" : "Montserrat-Regular",
              fontSize: seasonNumber === index ? 24 : 16,
              color: seasonNumber === index ? orange : white,
              textAlign: "center",
            }}
          >
            {item}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <Screen>
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} navigation={navigation} />
          <Text style={_styles.headerTitle}>Season Detail</Text>
          <View style={{ flex: 1, paddingRight: 12 }} />
        </View>
        <View style={_styles.titleBar} />
      </View>

      <View style={{ padding: 16, paddingBottom: 8 }}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
            <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 16, alignSelf: "center" }}>
              {listSeason[seasonNumber]}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={24} style={{ marginLeft: 8 }} />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={{ backgroundColor: white, flex: 1 }}>
        {isLoaded && dataSeason[seasonNumber] && (
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={dataSeason[seasonNumber].episodes}
            renderItem={({ item }) => seasonEpisode(item)}
            contentContainerStyle={{ margin: 8 }}
          />
        )}
      </View>

      <Modal
        isVisible={isModalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={{ height: "50%", margin: 0 }}
        onBackButtonPress={toggleModal}
        scrollTo={handleScrollTo}
        scrollOffset={scrollOffset}
        propagateSwipe={true}
      >
        <BlurView
          style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
          intensity={80}
          tint="dark"
        />
        <View style={{ maxHeight: "50%", alignSelf: "center" }}>
          <FlatList
            ref={seasonListRef}
            onScroll={handleOnScroll}
            data={listSeason}
            renderItem={({ item, index }) => seasonTab(item, index)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item}
          />
        </View>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              bottom: 0,
              marginBottom: 64,
              padding: 8,
              backgroundColor: orange,
              borderRadius: 8,
            }}
          >
            <MaterialCommunityIcons name="close" size={32} color={white} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Screen>
  );
};

export default MovieSeasonScreen;

const _styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    flex: 8,
    textAlign: "center",
    alignSelf: "center",
  },

  titleBar: {
    width: 40,
    height: 5,
    backgroundColor: orange,
    marginTop: 4,
    alignSelf: "center",
  },
});
