import * as githubActions from './githubActions';

export function fetchIssues() {
    return (dispatch) => {
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(response =>
        //         response.json().then(data => ({
        //             data: data,
        //             status: response.status
        //         }))
        //     )
        //     .then(response => {
        //         if(response.status === 200){
        //             dispatch(receiveStuff(response.data))
        //         }else{
        //             var flash = {
        //                 type: 'error',
        //                 title: 'Error getting task list',
        //                 content: 'There was an error getting the task list. Please try again.'
        //             }
        //             dispatch({type: "DISPLAY_FLASH", data: flash})
        //         }
        //     });
    };
}