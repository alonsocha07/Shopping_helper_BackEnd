//Render falls asleep with 15 minutes of inactivity, so we need a way to wake it up

export const wakeUpServer = async (req, res) => {
    res.status(200).send('Server is awake');
}
