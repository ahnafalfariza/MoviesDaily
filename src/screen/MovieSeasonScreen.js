import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import FastImage from "react-native-fast-image";
import { BlurView } from "@react-native-community/blur";

import Screen from "../component/Screen";
import { request } from "../api/api";
import { getTvShowSeasonUrl, getImageUrl } from "../api/url";
import { Styles } from "../component/MovieDetail/Styles";
import { white, orange } from "../helper/Color";
import BackIcon from "../component/Utils/BackIcon";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class MovieSeasonScreen extends Component {
  constructor(props) {
    super(props);
    const { season } = this.props.route.params;
    this.state = {
      dataSeason: [],
      isLoaded: false,
      season_number: season.season_number,
      isModalVisible: false,
    };
  }

  componentDidMount() {
    this.fetchSeasonData(this.state.season_number);
  }

  fetchSeasonData = async (season_number) => {
    const { movieid } = this.props.route.params;
    let tempData = this.state.dataSeason;
    if (!tempData[season_number]) tempData[season_number] = await request(getTvShowSeasonUrl(movieid, season_number));

    if (tempData[season_number]) this.setState({ dataSeason: tempData, isLoaded: true, season_number: season_number });
  };

  seasonEpisode = (data) => {
    const imageUrl = getImageUrl(data.still_path, "uri", "w500");
    return (
      <View style={{ margin: 8, backgroundColor: white, overflow: "hidden", flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={[Styles.imagePlaceholder, { height: 90, width: 160 }]}>
            <FastImage source={imageUrl} style={{ height: 90, width: 160 }} />
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

  onPressSeason = (index) => {
    this.fetchSeasonData(index);
    this.toggleModal();
  };

  handleOnScroll = (event) => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };
  handleScrollTo = (p) => {
    if (this.season_list.current) {
      this.season_list.current.scrollTo(p);
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({ isModalVisible: !prevState.isModalVisible }));
  };

  seasonTab = (item, index) => {
    const { season_number } = this.state;
    return (
      <View style={{ margin: 8, flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.onPressSeason(index);
          }}
        >
          <Text
            style={{
              fontFamily: season_number === index ? "Montserrat-Bold" : "Montserrat-Regular",
              fontSize: season_number === index ? 24 : 16,
              color: season_number === index ? orange : white,
              textAlign: "center",
            }}
          >
            {item}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  renderTitle = () => {
    const { navigation } = this.props;
    return (
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} navigation={navigation} />
          <Text style={_styles.headerTitle}>Season Detail</Text>
          <View style={{ flex: 1, paddingRight: 12 }}></View>
        </View>
        <View style={_styles.titleBar} />
      </View>
    );
  };

  renderSeasonDropdown = () => {
    const { season_number = 0 } = this.state;
    const { listSeason } = this.props.route.params;
    return (
      <View style={{ padding: 16, paddingBottom: 8 }}>
        <TouchableWithoutFeedback onPress={this.toggleModal}>
          <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
            <Text
              style={{
                fontFamily: "Montserrat-Bold",
                fontSize: 16,
                alignSelf: "center",
              }}
            >
              {listSeason[season_number]}
            </Text>
            <Icon name={"chevron-down"} size={24} style={{ marginLeft: 8 }} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  renderEpisodeList = () => {
    const { season_number = 0 } = this.state;
    return (
      <View style={{ backgroundColor: white, flex: 1 }}>
        {this.state.isLoaded && (
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={this.state.dataSeason[season_number].episodes}
            renderItem={({ item }) => this.seasonEpisode(item)}
            contentContainerStyle={{ margin: 8 }}
          />
        )}
      </View>
    );
  };

  renderListSeasonModal = () => {
    const { listSeason } = this.props.route.params;
    return (
      <Modal
        isVisible={this.state.isModalVisible}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        style={{ height: "50%", margin: 0 }}
        onBackButtonPress={this.toggleModal}
        scrollTo={this.handleScrollTo}
        scrollOffset={this.state.scrollOffset}
        propagateSwipe={true}
      >
        <BlurView
          style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
          blurType={"dark"}
          reducedTransparencyFallbackColor="white"
        />
        <View style={{ maxHeight: "50%", alignSelf: "center" }}>
          <FlatList
            ref={(ref) => (this.season_list = ref)}
            onScroll={this.handleOnScroll}
            data={listSeason}
            renderItem={({ item, index }) => this.seasonTab(item, index)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item}
          />
        </View>
        <TouchableWithoutFeedback onPress={this.toggleModal}>
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
            <Icon name={"close"} size={32} color={white} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  render() {
    return (
      <Screen>
        {this.renderTitle()}
        {this.renderSeasonDropdown()}
        {this.renderEpisodeList()}
        {this.renderListSeasonModal()}
      </Screen>
    );
  }
}

export default MovieSeasonScreen;

MovieSeasonScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      season: PropTypes.object,
      movieid: PropTypes.number,
      listSeason: PropTypes.array,
    }),
  }),
  listSeason: PropTypes.any,
  navigation: PropTypes.object,
};

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
