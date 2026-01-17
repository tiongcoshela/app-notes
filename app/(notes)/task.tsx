import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { supabase } from "@/services/supabase";
import NoteModal from "@/components/modals/NoteModal";
import EditNoteModal from "@/components/modals/EditNoteModal";

type Note = {
  id: string;
  title: string;
  description: string;
  color?: string;
};

const CARD_COLORS = ["#FFD08A", "#C5A3FF", "#B0E57C", "#FFB7B2", "#B2CEFE"];

export default function Task() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  // 1. ADD SEARCH STATE
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/(auth)/SignIn/signin");
  };

  const handleAddNote = () => {
    const randomColor = CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)];
    const newNote: Note = { 
        id: Date.now().toString(), 
        title, 
        description,
        color: randomColor 
    };
    setNotes([...notes, newNote]);
    setTitle("");
    setDescription("");
    setModalVisible(false);
  };

  const handleEditNote = (note: Note) => {
    setCurrentNote(note);
    setTitle(note.title);
    setDescription(note.description);
    setEditModalVisible(true);
  };

  const handleUpdateNote = () => {
    if (!currentNote) return;
    const updatedNotes = notes.map((note) =>
      note.id === currentNote.id ? { ...note, title, description } : note
    );
    setNotes(updatedNotes);
    setCurrentNote(null);
    setTitle("");
    setDescription("");
    setEditModalVisible(false);
  };

  const handleDeleteNote = () => {
    if (!currentNote) return;
    const filteredNotes = notes.filter((note) => note.id !== currentNote.id);
    setNotes(filteredNotes);
    setCurrentNote(null);
    setTitle("");
    setDescription("");
    setEditModalVisible(false);
  };

  // 2. FILTER LOGIC
  // This automatically updates the list whenever 'searchQuery' or 'notes' changes
  const filteredNotes = notes.filter((note) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(searchLower) ||
      note.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>App Notes</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* 3. UPDATED SEARCH BAR */}
        <TextInput 
          style={styles.searchBar} 
          placeholder="Search notes..." 
          placeholderTextColor="#888" 
          value={searchQuery} // Bind state
          onChangeText={setSearchQuery} // Update state on type
          autoCapitalize="none"
        />

        <FlatList
          data={filteredNotes} // 4. USE FILTERED DATA INSTEAD OF 'notes'
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.noteCard, { backgroundColor: item.color || "#fff" }]} 
              onPress={() => handleEditNote(item)}
            >
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteBody}>{item.description}</Text>
              <View style={styles.noteFooter}>
                <Text style={styles.noteDate}>January 17, 2026</Text>
                <View style={styles.editIcon}>
                  <Text style={{fontSize: 12}}>✏️</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity 
            style={styles.fab} 
            onPress={() => {
                setTitle("");
                setDescription("");
                setModalVisible(true);
            }}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>

        <NoteModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleAddNote}
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
        />

        <EditNoteModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          onUpdate={handleUpdateNote}
          onDelete={handleDeleteNote}
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: "#87CEEB" },
  container: { flex: 1, paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 32, fontWeight: "900", color: "#1a1a1a" },
  logoutButton: {
    backgroundColor: "#FF4B4B",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  logoutText: { color: "white", fontWeight: "bold" },
  searchBar: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Increased opacity for better visibility
    borderRadius: 20,
    padding: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    color: "#000", // Ensures typed text is black
  },
  noteCard: {
    borderRadius: 25,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },
  noteTitle: { fontSize: 20, fontWeight: "bold", color: "#1a1a1a", marginBottom: 5 },
  noteBody: { fontSize: 16, color: "#333", marginBottom: 15 },
  noteFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  noteDate: { fontSize: 12, color: "#666" },
  editIcon: { backgroundColor: "rgba(0,0,0,0.05)", padding: 6, borderRadius: 12 },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#1a1a1a",
    width: 65,
    height: 65,
    borderRadius: 33,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: { color: "white", fontSize: 35, fontWeight: "300" },
});