import React from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";

export type NoteModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onUpdate?: () => void;   // <-- Add optional onUpdate
  onDelete?: () => void;   // <-- Add optional onDelete
  title: string;
  description: string;
  onTitleChange: (text: string) => void;
  onDescriptionChange: (text: string) => void;
};

export default function NoteModal({
  visible,
  onClose,
  onSubmit,
  onUpdate,
  onDelete,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: NoteModalProps) {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Note</Text>

          <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={onTitleChange}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          placeholderTextColor="#999"
          value={description}
          onChangeText={onDescriptionChange}
          multiline
        />


          <View style={styles.buttonRow}>
            {onSubmit && (
              <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={onSubmit}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            )}

            {onUpdate && (
              <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={onUpdate}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            )}

            {onDelete && (
              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: "#0083b0",
  },
  input: {
  backgroundColor: "#f5f5f5",
  borderRadius: 15,
  padding: 12,
  marginBottom: 12,
  fontSize: 16,
  color: "#000", // ✅ ADD THIS
},

  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    marginHorizontal: 4,
  },
  submitButton: { backgroundColor: "#0083b0" },
  updateButton: { backgroundColor: "#00b4db" },
  deleteButton: { backgroundColor: "#FF4D4D" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  closeButton: { marginTop: 12, alignItems: "center" },
  closeButtonText: { color: "#0083b0", fontWeight: "bold", fontSize: 16 },
});
