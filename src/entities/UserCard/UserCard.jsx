import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./UserCard.module.scss";

class UserCard extends Component {
    render() {
        const { name, gender, username, country, img, email, phone } =
            this.props;

        let nameColorStyle;
        if (gender === "male") {
            nameColorStyle = styles.isMale;
        } else if (gender === "female") {
            nameColorStyle = styles.isFemale;
        }

        return (
            <article className={styles.card}>
                <img className={styles.image} src={img} alt={name} />
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h2 className={`${styles.name} ${nameColorStyle}`}>
                            {name}
                        </h2>
                        <p className={styles.username}>@{username}</p>
                    </div>
                </div>
                <div className={styles.contacts}>
                    <a href={`mailto:${email}`} className={styles.email}>
                        {email}
                    </a>
                    <a href={`tel:${phone}`} className={styles.phone}>
                        {phone}
                    </a>
                </div>
            </article>
        );
    }
}

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
};

export default UserCard;
