import PropTypes from 'prop-types';
import React from 'react';
import getIconSet from './helpers/getIconSet';
import { NAMED_COLORS } from '../../styling/common';

const Icon = (props) => {
    const Icon = getIconSet(props.iconSet);
    return (
        <Icon {...props} />
    );
};

Icon.propTypes = {
    iconSet: PropTypes.oneOf([
        'Entypo',
        'EvilIcons',
        'Feather',
        'FontAwesome',
        'Foundation',
        'IcoMoon',
        'Ionicons',
        'MaterialCommunityIcons',
        'MaterialIcons',
        'Octicons',
        'SimpleLineIcons',
        'Zocial'
    ]).isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string
};

Icon.defaultProps = {
    color: NAMED_COLORS.black
};

export default Icon;
