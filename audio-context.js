function initAudioContext(stream, onVolumeChange) {
    var context = new AudioContext();
    var source = context.createMediaStreamSource(stream);

    var analyser = context.createAnalyser();

    var processorNode = context.createScriptProcessor(2048, 1, 1);
    var array = new Uint8Array(analyser.frequencyBinCount);

    // Connect the audioinput to the analyser node
    source.connect(analyser);
    analyser.connect(processorNode);
    processorNode.connect(context.destination);

    processorNode.onaudioprocess = function () {
        analyser.getByteFrequencyData(array);
        var averageVolume = getAverageVolume(array)
        requestAnimationFrame(() => onVolumeChange(averageVolume, context));
    }

    function getAverageVolume(array) {
        var amplitudeSum = 0;

        for (var i = 0; i < array.length; i++) {
            amplitudeSum += array[i];
        }

        return amplitudeSum / array.length;
    }
}
