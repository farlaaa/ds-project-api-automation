module.exports = {
    timeout: 10000,
    reporter: 'mochawesome', 
        'reporter-option': [
        'reportDir=report-dsProject', 
        'reportFilename=[status]_[datetime]-[name]-report',
        'html=true', 
        'json=true', 
        'overwrite=false', 
        'timestamp=longDate', 
    ],
};