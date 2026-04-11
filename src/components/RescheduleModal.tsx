import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

type RescheduleModalProps = {
  visible: boolean;
  taskTitle: string;
  onReschedule: (date: string) => void; // date as 'YYYY-MM-DD'
  onClose: () => void;
};

function buildCalendarDays(): { date: Date; label: string; iso: string }[] {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 28; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      date: d,
      label: d.toLocaleDateString('en-CA'),
      iso: d.toLocaleDateString('en-CA'),
    });
  }
  return days;
}

export function RescheduleModal({
  visible,
  taskTitle,
  onReschedule,
  onClose,
}: RescheduleModalProps) {
  const tomorrow = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString('en-CA');
  })();

  const [selected, setSelected] = useState(tomorrow);
  const days = buildCalendarDays();

  // Group by week for a calendar grid
  const weeks: (typeof days)[number][][] = [];
  let week: (typeof days)[number][] = [];

  // Fill empty days before the first day
  const firstDay = days[0].date.getDay(); // 0 = Sun
  for (let i = 0; i < firstDay; i++) week.push(null as any);

  days.forEach((day) => {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length) weeks.push(week);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.card}>
        <View style={styles.handle} />
        <Text style={styles.title}>Reschedule</Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {taskTitle}
        </Text>

        {/* Day-of-week headers */}
        <View style={styles.weekRow}>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <Text key={d} style={styles.weekLabel}>
              {d}
            </Text>
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {weeks.map((week, wi) => (
            <View key={wi} style={styles.weekRow}>
              {week.map((day, di) => {
                if (!day) return <View key={di} style={styles.dayCell} />;
                const isSelected = day.iso === selected;
                return (
                  <TouchableOpacity
                    key={di}
                    style={[styles.dayCell, isSelected && styles.dayCellSelected]}
                    onPress={() => setSelected(day.iso)}
                  >
                    <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                      {day.date.getDate()}
                    </Text>
                    <Text style={[styles.dayMonth, isSelected && styles.dayTextSelected]}>
                      {day.date.toLocaleString('default', { month: 'short' })}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </ScrollView>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => {
              onReschedule(selected);
              onClose();
            }}
          >
            <Text style={styles.confirmText}>Move Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1c1c1e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 36,
    maxHeight: '80%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#444',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: '#888', fontSize: 14, marginBottom: 16 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  weekLabel: {
    color: '#666',
    fontSize: 11,
    width: '14.28%',
    textAlign: 'center',
    fontWeight: '600',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  dayCellSelected: { backgroundColor: '#4f8ef7' },
  dayText: { color: '#ddd', fontSize: 13, fontWeight: '600' },
  dayMonth: { color: '#666', fontSize: 9 },
  dayTextSelected: { color: '#fff' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 20 },
  cancelBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  cancelText: { color: '#aaa', fontWeight: '600' },
  confirmBtn: {
    flex: 2,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#4f8ef7',
    alignItems: 'center',
  },
  confirmText: { color: '#fff', fontWeight: '700' },
});
