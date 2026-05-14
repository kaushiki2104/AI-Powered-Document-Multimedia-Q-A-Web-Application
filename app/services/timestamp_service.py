def extract_timestamps(transcription_segments, topic):

    timestamps = []

    for segment in transcription_segments:

        text = segment.get("text", "").lower()

        if topic.lower() in text:

            timestamps.append({
                "start": segment.get("start"),
                "end": segment.get("end"),
                "text": segment.get("text")
            })

    return timestamps