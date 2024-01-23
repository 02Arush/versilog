const localHost = 'http://127.0.0.1:5000'
const host = localHost;


/*
    This is some of the most atrocious api code ever written because the outputs are inconsistent.
    I promise I'll fix it and won't write this bad if you hire me.
    Sincerely, Arush

*/
// API For Versilog
// Out: void
export async function check() {
    try {
        const response = await fetch(`${host}/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('API Connection Success')

    } catch (error) {
        console.error('FETCH API ERROR:\n', error);
    }
}

/*
    out: status code (number)
*/
export async function registerUser(first_name, last_name, email, password) {
    const jsonData = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": password
    }

    try {
        const response = await fetch(`${host}/register_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${response.message}`);
        }
        const responseObject = await response.json();
        return responseObject.status
    } catch (error) {
        return 500;
    }
}

/*

    out: {
        status: number,
        password_match: boolean
    }
*/
export async function attemptLogin(email, password) {
    const jsonData = {
        'email': email,
        'password': password
    }
    try {
        const response = await fetch(`${host}/attempt_login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData),
        })

        const responseObject = await response.json()
        return {
            status: responseObject.status,
            passsword_match: responseObject.status === 200,
            authToken: responseObject.authToken
        }

    } catch (error) {
        // seems to be a database error
        return {
            status: 500,
            password_match: false
        }
    }
}

export async function create_org(user_id, unique_org_name, display_org_name, desc) {
    const jsonData = {
        user_id, unique_org_name, display_org_name, desc
    }

    try {
        const response = await fetch(`${host}/create_organization`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData),
        })
        res_json = await response.json()
        alert(JSON.stringify(res_json));
        return res_json;
    } catch (error) {
        return { status: 500, message: "API error" };
    }
}