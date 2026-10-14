import queryString from "query-string";
import CONFIGS from "./../configs";

function getUsers(options) {
    const defaultOptions = {
        page: 1,
        results: CONFIGS.RESULTS_COUNT,
        seed: CONFIGS.RESULTS_ORDER,
        inc: CONFIGS.INCLUDUNG_RESULTS,
        gender: CONFIGS.GENDER,
    };

    const realOptions = {
        ...defaultOptions,
        ...options,
    };

    if (realOptions.gender !== "all" && options.seed === undefined) {
        delete realOptions.seed;
    }

    const queryStringifiedOptions = queryString.stringify(realOptions, {
        arrayFormat: "comma",
    });

    return fetch(`${CONFIGS.BASE_URL}?${queryStringifiedOptions}`).then(
        (response) => response.json(),
    );
}

export default getUsers;
