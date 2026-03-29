import { useEffect, useState } from 'react';
import { Task } from '@/src/types/Task';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { ConfirmModal } from './ConfirmModal';

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
      <Pressable style={sheet.backdrop} onPress={onClose} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={sheet.sheetWrapper}
      >
        <View style={sheet.sheet}>
          {/* Handle bar */}
          <View style={sheet.handle} />

          <Text style={sheet.sheetTitle}>{initial ? 'Edit Task' : 'New Task'}</Text>

          {/* Title input */}
          <Text style={sheet.label}>Task</Text>
          <TextInput
            style={sheet.input}
            value={title}
            onChangeText={setTitle}
            placeholder="What do you need to do?"
            placeholderTextColor="#bbb"
            autoFocus
          />

          {/* Priority picker */}
          <Text style={sheet.label}>Priority</Text>
          <View style={sheet.chipRow}>
            {PRIORITY_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[sheet.chip, priority === opt && sheet.chipActive]}
                onPress={() => setPriority(opt)}
              >
                <Text style={[sheet.chipText, priority === opt && sheet.chipTextActive]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Time input */}
          <Text style={sheet.label}>Time</Text>
          <TextInput
            style={sheet.input}
            value={time}
            onChangeText={setTime}
            placeholder="e.g. 30m, 1h"
            placeholderTextColor="#bbb"
          />

          {/* Feeling picker */}
          <Text style={sheet.label}>Feeling</Text>
          <View style={sheet.chipRow}>
            {FEELING_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[sheet.chip, feeling === opt && sheet.chipActive]}
                onPress={() => setFeeling(opt)}
              >
                <Text style={[sheet.chipText, feeling === opt && sheet.chipTextActive]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Save and Delete Actions */}
          <View style={sheet.actions}>
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
                    style={sheet.deleteBtn}
                    onPress={() => setConfirmingDelete(true)}
                  >
                    <Text style={sheet.deleteBtnText}>Delete</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
            <TouchableOpacity
              style={[sheet.saveBtn, !title.trim() && sheet.saveBtnDisabled]}
              onPress={handleSave}
            >
              <Text style={sheet.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const sheet = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  sheetWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
    gap: 6,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1a1a1a',
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
  chipActive: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  chipText: {
    fontSize: 13,
    color: '#555',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 20,
  },
  saveBtn: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
  },
  saveBtnDisabled: {
    backgroundColor: '#ccc',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  deleteBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f00',
  },
  deleteBtnText: {
    color: '#f00',
    fontWeight: '600',
    fontSize: 15,
  },
});
