import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Avatar } from '@material-ui/core';

const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'

const useStyles = makeStyles(theme => ({
	avatar: {
		margin: 5, 
		[theme.breakpoints.down('sm')]: {
			width: 60,
			height: 60,
		},
		[theme.breakpoints.up('sm')]: {
			width: 280,
			height: 280,
		},
	},
}));

const StyledAvatar = (props) =>{
	const { avatar } = useStyles();
	const { name, src }  = props;

	return(
		<Avatar className={`${avatar}`} alt={name} src={src} />
	)
}

StyledAvatar.defaultProps = {
	src: defaultAvatar,
}

StyledAvatar.propTypes = {
	name: PropTypes.string.isRequired,
	src: PropTypes.string,
}

export default StyledAvatar;