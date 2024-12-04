import React, { useContext, useEffect, useState } from 'react';
import { YouTubeContext } from './YoutubeContext';
import { View, Text, TextInput, Button, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const MainScreen = () => {
  const { videos, loading, error, fetchVideos } = useContext(YouTubeContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    fetchVideos(searchQuery);
  };

  useEffect(() => {
    fetchVideos(); // Fetch videos on initial render
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search videos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />

      {loading && <ActivityIndicator size="large" color="#007bff" />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
  data={videos}
  keyExtractor={(item, index) => item.id.videoId || item.id.channelId || index.toString()}
  renderItem={({ item }) => (
    <View style={styles.videoItem}>
      <Text style={styles.videoTitle}>{item.snippet.title}</Text>
      <Image
        source={{ uri: item.snippet.thumbnails.high.url }}
        style={styles.thumbnail}
      />
      <Text style={styles.videoChannel}>{item.snippet.channelTitle}</Text>
    </View>
  )}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 26, backgroundColor: '#fff' },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  videoItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  thumbnail: {
    width: 120, 
    height: 90, 
    resizeMode: 'cover',
    borderRadius: 5,
  },
  videoTitle: { fontWeight: 'bold', fontSize: 16 },
  videoChannel: { color: '#555' },
  error: { color: 'red', marginTop: 10 },
});

export default MainScreen;
