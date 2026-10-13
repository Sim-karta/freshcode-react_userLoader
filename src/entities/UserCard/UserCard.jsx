import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./UserCard.module.scss";

class UserCard extends Component {
    render() {
        const { name, gender, username, country, img, email, phone } =
            this.props;

        return (
            <article className={styles.card}>
                <div className={styles.header}>
                    <img className={styles.image} src={img} alt={name} />
                    <div className={styles.title}>
                        <h2 className={styles.name}>{name}</h2>
                        <p className={styles.username}>{username}</p>
                    </div>
                    <div className={styles.contacts}>
                        <a href={`mailto:${email}`} className={styles.email}>
                            {email}
                        </a>
                        <a href={`tel:${phone}`} className={styles.phone}>
                            {phone}
                        </a>
                    </div>
                </div>
            </article>
        );
    }
}

UserCard.propTypes = {};

export default UserCard;
