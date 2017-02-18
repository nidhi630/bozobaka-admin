"use strict";

import {connect} from 'react-redux';

import HeaderComponent from './../components/HeaderComponent';

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer,
        ...state.UserReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderComponent);

export default HeaderContainer;