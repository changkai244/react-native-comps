/**
 * Created by youhan on 2017/11/06.
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  SectionList,
  StyleSheet,
  RefreshControl
} from 'react-native';
import UTILS from 'mimikiy-utils';

class BaseSectionList extends PureComponent {
  constructor(props) {
    super(props);
    
    this.onEndReach = this.onEndReach.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.load = this.load.bind(this);
  }
  
  componentDidMount() {
    if (this.props.initLoad) {
      this.load(false);
    }
  }
  
  load(isPull) {
    const {total, sections, loading} = this.props;
    if (loading) {
      return;
    }
    const len = sections.reduce((sum, obj) => {
      return sum + obj.data.length;
    }, 0);
    if (isPull && total !== 0 && total === len) {
      return;
    }
    
    this.props.onLoad(isPull);
  }
  
  onEndReach() {
    this.load(true);
  }
  
  onRefresh() {
    this.load(false);
  }
  
  render() {
    const {
      renderSeparator,
      sectionSeparator,
      sections, empty, loading, footer, header, keyExtractor, ...others
    } = this.props;
    
    return (
      <SectionList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={this.onRefresh}
          />
        }
        initialNumToRender={1}
        keyExtractor={keyExtractor}
        onEndReached={this.onEndReach}
        onEndReachedThreshold={0}
        scrollEventThrottle={16}
        ItemSeparatorComponent={renderSeparator}
        horizontal={false}
        ListEmptyComponent={empty}
        ListFooterComponent={footer}
        ListHeaderComponent={header}
        SectionSeparatorComponent={sectionSeparator}
        sections={sections}
        {...others}
      />
    );
  }
}

BaseSectionList.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.array,
    title: PropTypes.string
  })).isRequired,
  
  initLoad: PropTypes.bool,
  onLoad: PropTypes.func,
  loading: PropTypes.bool,
  total: PropTypes.number,
  keyExtractor: PropTypes.func,
  extraData: PropTypes.any,
  header: PropTypes.node,
  footer: PropTypes.node,
  empty: PropTypes.node,
  renderSeparator: PropTypes.func,
  renderItem: PropTypes.func,
  sectionSeparator: PropTypes.func,
  renderSectionFooter: PropTypes.func,
  renderSectionHeader: PropTypes.func,
  stickySectionHeadersEnabled: PropTypes.bool,
};

BaseSectionList.defaultProps = {
  loading: false,
  initLoad: true,
  keyExtractor: function (item) {
    return item.key;
  },
  sections: [],
  onLoad: UTILS.noop,
  total: 0,
  
  empty: null,
  footer: null,
  header: null,
  renderSeparator: undefined,
  renderItem: undefined,
  renderSectionHeader: undefined,
  sectionSeparator: undefined,
  extraData: null,
  stickySectionHeadersEnabled: true
};

export default BaseSectionList;