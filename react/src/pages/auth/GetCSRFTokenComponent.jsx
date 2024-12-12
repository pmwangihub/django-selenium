import { useEffect, useState } from 'react';
import { Api } from "../../api";

// Deprecated

export const GetCSRFTokenComponent = () => {

	const [csrftoken, setCsrftoken] = useState(null);

	useEffect(() => {
		Api.getCSRFToken()
			.then(response => {
				setCsrftoken(response.data.csrfToken)
			}).catch(error => {
				console.error('Error fetching CSRF token:', error);
			})
		return () => setCsrftoken(null);
	}, [])

	return <input className="form-control" type="text" name="csrfmiddlewaretoken" value={csrftoken} disabled />

}
