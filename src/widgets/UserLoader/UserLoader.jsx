import { Component } from "react";
import getUsers from "../../shared/api";
import UserCard from "../../entities/UserCard/UserCard";
import styles from "./UserLoader.module.scss";

class UsersLoader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            isFetching: false,
            error: null,
            currentPage: 1,
            gender: "all",
        };
    }

    loadUsers = () => {
        const { currentPage, gender } = this.state;

        this.setState({ isFetching: true });
        getUsers({ page: currentPage, results: 8, gender: gender })
            .then((data) => this.setState({ users: data.results }))
            .catch((e) => this.setState({ error: e }))
            .finally(() => this.setState({ isFetching: false }));
    };

    componentDidMount() {
        this.loadUsers();
    }

    componentDidUpdate(prevProps, prevState) {
        const { currentPage, gender } = this.state;

        if (
            currentPage !== prevState.currentPage ||
            gender !== prevState.gender
        ) {
            this.loadUsers();
        }
    }

    prevPage = () => {
        const { currentPage } = this.state;
        if (currentPage > 1) {
            this.setState({ currentPage: currentPage - 1 });
        }
    };

    nextPage = () => {
        const { currentPage } = this.state;
        this.setState({ currentPage: currentPage + 1 });
    };

    setAllGenders = () => {
        this.setState({ gender: "all" });
    };

    setMaleGender = () => {
        this.setState({ gender: "male" });
    };

    setFemaleGender = () => {
        this.setState({ gender: "female" });
    };

    render() {
        const { users, isFetching, error, gender } = this.state;

        return (
            <>
                {error && <div>!!!ERROR!!! {JSON.stringify(error)}</div>}
                {isFetching && <div>Loading. Please waite...</div>}
                {!error && !isFetching && (
                    <div className={styles.userLoader}>
                        <div className={styles.menu}>
                            <div className={styles.genders}>
                                <button
                                    className={
                                        gender === "all" ? styles.isActive : ""
                                    }
                                    onClick={this.setAllGenders}
                                    disabled={gender === "all"}
                                >
                                    {"All"}
                                </button>
                                <button
                                    className={
                                        gender === "male" ? styles.isActive : ""
                                    }
                                    onClick={this.setMaleGender}
                                    disabled={gender === "male"}
                                >
                                    {"Male"}
                                </button>
                                <button
                                    className={
                                        gender === "female"
                                            ? styles.isActive
                                            : ""
                                    }
                                    onClick={this.setFemaleGender}
                                    disabled={gender === "female"}
                                >
                                    {"Female"}
                                </button>
                            </div>
                            <div className={styles.navigation}>
                                <button onClick={this.prevPage}>{"<"}</button>
                                <button onClick={this.nextPage}>{">"}</button>
                            </div>
                        </div>
                        <ul className={styles.userList}>
                            {users.map((u) => (
                                <li key={u.login.uuid}>
                                    <UserCard
                                        name={`${u.name.first} ${u.name.last}`}
                                        gender={u.gender}
                                        username={u.login.username}
                                        country={u.country}
                                        email={u.email}
                                        phone={u.phone}
                                        img={u.picture.large}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </>
        );
    }
}

export default UsersLoader;
