import React from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { Constants } from "@common";
import { toast, log } from "@common/Tools";

class SimpleFlatlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefresh : false,
    }
    this.pageNumber = 0;
    this.storeVal = this.props.storeVal;
  }

  componentDidMount(){
    const { searchRead, model, domain, fields, listLimit = Constants.listLimit } = this.props;
    let offset = listLimit * this.pageNumber;
    searchRead(model, domain, fields, listLimit, offset, this.storeVal);
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if (nextProps.listData !== this.props.listData) {
      if(nextProps.listData[this.storeVal] && nextProps.listData[this.storeVal].error != null){
        toast(nextProps.listData[this.storeVal].error);
      }
    }
  }

  onEndReached = () => {
    const { searchRead, model, domain, fields, listData, listLimit = Constants.listLimit } = this.props;
    if(listData[this.storeVal].stillFetch){
      this.pageNumber = this.pageNumber + 1;
      let offset = listLimit * this.pageNumber;
      searchRead(model, domain, fields, listLimit, offset, this.storeVal);
    }
  }

  onRefreshHandle = () => {
    const { searchRead, model, domain, fields, listLimit = Constants.listLimit } = this.props;
    this.pageNumber = 0;
    let offset = listLimit * this.pageNumber;
    searchRead(model, domain, fields, listLimit, offset, this.storeVal);
  }

  render() {
    const { listData, renderItem, onEndReachedThreshold = 0.15} = this.props;
    return (
      <FlatList
          style={{flex:1,marginBottom:10}}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          data={listData[this.storeVal] ? listData[this.storeVal].list : []}
          extraData={this.props}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return renderItem(item, index, listData[this.storeVal].isFetching)
          }}
          onEndReachedThreshold={onEndReachedThreshold}
          onEndReached={this.onEndReached}
          refreshing={this.state.isRefresh}
          onRefresh={this.onRefreshHandle}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isConnected: state.netInfo.isConnected,
    user: state.user.result,
    listData : state.allList,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/ListRedux");
  const { isConnected } = stateProps;
  return {
    ...ownProps,
    ...stateProps,
    searchRead: (model, domain, fields, listLimit, offset, storeVal) => {
      if(isConnected){
        actions.searchRead(dispatch, model, domain, fields, listLimit, offset, storeVal)
      }else{
        toast(Languages.InternetError)
      }
    },
  };
}

export default (connect(mapStateToProps,undefined,mergeProps)(SimpleFlatlist));
