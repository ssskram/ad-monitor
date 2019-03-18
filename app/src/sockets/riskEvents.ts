import io from 'socket.io-client'
let socket = io('https://restless.azurewebsites.us/adMonitor/riskEvents')

export function subscribeToEvents (cb) {
    socket.on('data', function (data) {
        cb(null, data)
    })
    socket.emit('subscribe')
}