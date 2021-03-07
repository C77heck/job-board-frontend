

const compareDates = (submitted_at) => {
    const dayInMS = 86400000;//turn it into and object;

    // we turn the ad date into a js date object without setting the specific time
    // and get the value in ms
    const adDateMS = new Date(submitted_at.replace(/-/g, ','));

    // create a current date object.
    const d = new Date();
    // we then create a date object in ms without setting the time
    const todayMS = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    // return the number of days since the ad has been posted
    const diff = (todayMS.getTime() - adDateMS.getTime()) / dayInMS;

    // we condition the return value to display
    if (diff === 0) {
        return 'Today';
    }
    if (diff === 1) {
        return 'Yesterday';
    }

    return `Posted ${diff} days ago`;

}

export default compareDates;