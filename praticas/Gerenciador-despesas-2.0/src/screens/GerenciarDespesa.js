import { useCallback, useLayoutEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useHeaderHeight } from '@react-navigation/elements';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../constants/categories';
import { getTheme } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';
import { endOfToday, formatDate } from '../util/format';

function validate(values) {
  const errors = {};
  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }
  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }
  if (values.date > endOfToday()) {
    errors.date = 'A data não pode ser futura.';
  }
  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }
  return errors;
}

export default function GerenciarDespesa({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const theme = getTheme(useColorScheme());
  const headerHeight = useHeaderHeight();

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const editedExpense = expenses.find((e) => e.id === expenseId);

  const [form, setForm] = useState({
    description: editedExpense?.description ?? '',
    amount: editedExpense ? String(editedExpense.amount) : '',
    date: editedExpense ? new Date(editedExpense.date) : new Date(),
    category: editedExpense?.category ?? '',
  });
  const [errors, setErrors] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  function handleChange(field, value) {
    const newForm = { ...form, [field]: value };
    setForm(newForm);
    // Remove a mensagem do campo assim que ele for corrigido.
    if (errors[field]) {
      const newErrors = validate(newForm);
      setErrors((prev) => {
        const next = { ...prev };
        if (newErrors[field]) next[field] = newErrors[field];
        else delete next[field];
        return next;
      });
    }
  }

  function handleAmountChange(text) {
    const normalized = text.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalized)) {
      handleChange('amount', normalized);
    }
  }

  function handleDateChange(event, selectedDate) {
    if (Platform.OS === 'android') setShowPicker(false);
    if (event.type === 'set' && selectedDate) handleChange('date', selectedDate);
  }

  const handleDelete = useCallback(() => {
    Alert.alert('Excluir despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }, [deleteExpense, expenseId, navigation]);

  function handleSave() {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date.toISOString(),
      category: form.category,
    };
    if (isEditing) updateExpense(expenseId, data);
    else addExpense(data);
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
      headerRight: isEditing
        ? () => (
            <Pressable onPress={handleDelete} hitSlop={8}>
              <Ionicons name="trash" size={24} color={theme.error} />
            </Pressable>
          )
        : undefined,
    });
  }, [navigation, isEditing, handleDelete, theme.error]);

  const inputStyle = (field) => [
    styles.input,
    {
      backgroundColor: theme.input,
      color: theme.text,
      borderColor: errors[field] ? theme.error : theme.border,
    },
  ];

  const errorText = (field) =>
    errors[field] ? <Text style={[styles.error, { color: theme.error }]}>{errors[field]}</Text> : null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={[styles.label, { color: theme.text }]}>Descrição</Text>
        <TextInput
          style={inputStyle('description')}
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Ex.: Almoço"
          placeholderTextColor={theme.textMuted}
        />
        {errorText('description')}

        <Text style={[styles.label, { color: theme.text }]}>Valor (R$)</Text>
        <TextInput
          style={inputStyle('amount')}
          value={form.amount}
          onChangeText={handleAmountChange}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={theme.textMuted}
        />
        {errorText('amount')}

        <Text style={[styles.label, { color: theme.text }]}>Data</Text>
        <Pressable style={inputStyle('date')} onPress={() => setShowPicker(true)}>
          <Text style={{ color: theme.text }}>{formatDate(form.date)}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={form.date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}
        {errorText('date')}

        <Text style={[styles.label, { color: theme.text }]}>Categoria</Text>
        <Pressable style={inputStyle('category')} onPress={() => setShowCategories(true)}>
          <Text style={{ color: form.category ? theme.text : theme.textMuted }}>
            {form.category || 'Selecione uma categoria'}
          </Text>
        </Pressable>
        {errorText('category')}

        <View style={styles.buttons}>
          <Pressable
            style={[styles.button, { backgroundColor: theme.chip }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: theme.text, fontWeight: 'bold' }}>Cancelar</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleSave}>
            <Text style={{ color: theme.onPrimary, fontWeight: 'bold' }}>
              {isEditing ? 'Atualizar' : 'Salvar'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        visible={showCategories}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategories(false)}
      >
        <Pressable
          style={[styles.overlay, { backgroundColor: theme.overlay }]}
          onPress={() => setShowCategories(false)}
        >
          <View style={[styles.sheet, { backgroundColor: theme.card }]}>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>Escolha a categoria</Text>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                style={styles.option}
                onPress={() => {
                  handleChange('category', category);
                  setShowCategories(false);
                }}
              >
                <Text
                  style={{
                    color: form.category === category ? theme.primary : theme.text,
                    fontWeight: form.category === category ? 'bold' : 'normal',
                    fontSize: 16,
                  }}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 48 },
  label: { fontSize: 14, fontWeight: 'bold', marginTop: 16, marginBottom: 6 },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  error: { fontSize: 12, marginTop: 4 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 28, gap: 12 },
  button: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 8 },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  sheet: { padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  sheetTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  option: { paddingVertical: 14 },
});
