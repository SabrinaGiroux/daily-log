import { useEffect, useState } from 'react';
import { Task } from '@/src/types/Task';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { ConfirmModal } from './ConfirmModal';
import { modalStyles } from '@/src/styles/homeScreenStyles';

type TaskModalProps = {
  visible: boolean;
  initial?: Task | null;
  onSave: (task: Omit<Task, 'id'>) => void;
  onDelete?: () => void;
  onClose: () => void;
};

const PRIORITY_OPTIONS = ['Low', 'Med', 'High'];
const FEELING_OPTIONS = ['Happy', 'Neutral', 'Stressed', 'Tired'];

export function TaskModal({ visible, initial, onSave, onDelete, onClose }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Med');
  const [time, setTime] = useState('30min');
  const [feeling, setFeeling] = useState('Neutral');
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  // Pre-fill if editing an existing task
  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setPriority(initial.priority);
      setTime(initial.time);
      setFeeling(initial.feeling);
    } else {
      setTitle('');
      setPriority('Med');
      setTime('30min');
      setFeeling('Neutral');
    }
  }, [initial, visible]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title: title.trim(), priority, time, feeling, completed: false });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      {/* Dim background */}
      <Pressable style={modalStyles.backdrop} onPress={onClose} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={modalStyles.modalWrapper}
      >
        <View style={modalStyles.modal}>
          {/* Handle bar */}
          <View style={modalStyles.handle} />

          <Text style={modalStyles.modalTitle}>{initial ? 'Edit Task' : 'New Task'}</Text>

          {/* Title input */}
          <Text style={modalStyles.label}>Task</Text>
          <TextInput
            style={modalStyles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="What do you need to do?"
            placeholderTextColor="#bbb"
            autoFocus
          />

          {/* Priority picker */}
          <Text style={modalStyles.label}>Priority</Text>
          <View style={modalStyles.chipRow}>
            {PRIORITY_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[modalStyles.chip, priority === opt && modalStyles.chipActive]}
                onPress={() => setPriority(opt)}
              >
                <Text
                  style={[modalStyles.chipText, priority === opt && modalStyles.chipTextActive]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Time input */}
          <Text style={modalStyles.label}>Time</Text>
          <TextInput
            style={modalStyles.input}
            value={time}
            onChangeText={setTime}
            placeholder="e.g. 30m, 1h"
            placeholderTextColor="#bbb"
          />

          {/* Feeling picker */}
          <Text style={modalStyles.label}>Feeling</Text>
          <View style={modalStyles.chipRow}>
            {FEELING_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[modalStyles.chip, feeling === opt && modalStyles.chipActive]}
                onPress={() => setFeeling(opt)}
              >
                <Text style={[modalStyles.chipText, feeling === opt && modalStyles.chipTextActive]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Save and Delete Actions */}
          <View style={modalStyles.actions}>
            {onDelete && (
              <>
                {confirmingDelete ? (
                  <ConfirmModal
                    message="Your task will be lost forever! Are you sure?"
                    actionLabel="Delete Task"
                    onAction={onDelete}
                    onClose={() => setConfirmingDelete(false)}
                  />
                ) : (
                  <TouchableOpacity
                    style={modalStyles.deleteBtn}
                    onPress={() => setConfirmingDelete(true)}
                  >
                    <Text style={modalStyles.deleteBtnText}>Delete</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
            <TouchableOpacity
              style={[modalStyles.saveBtn, !title.trim() && modalStyles.saveBtnDisabled]}
              onPress={handleSave}
            >
              <Text style={modalStyles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
