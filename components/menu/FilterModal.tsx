import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import { X } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const filterOptions = {
  sortBy: [
    { id: 'recommended', label: 'Recomendados' },
    { id: 'price-asc', label: 'Preço: Menor para Maior' },
    { id: 'price-desc', label: 'Preço: Maior para Menor' },
    { id: 'popular', label: 'Mais Populares' },
    { id: 'new', label: 'Novidades' },
  ],
  priceRange: [
    { id: 'under-20', label: 'Até R$ 20' },
    { id: '20-30', label: 'R$ 20 - R$ 30' },
    { id: '30-40', label: 'R$ 30 - R$ 40' },
    { id: 'over-40', label: 'Acima de R$ 40' },
  ],
};

export default function FilterModal({ visible, onClose }: FilterModalProps) {
  const [selectedSortBy, setSelectedSortBy] = useState('recommended');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [showPromo, setShowPromo] = useState(false);
  const [showNew, setShowNew] = useState(false);
  
  const togglePriceRange = (id: string) => {
    if (selectedPriceRanges.includes(id)) {
      setSelectedPriceRanges(selectedPriceRanges.filter(rangeId => rangeId !== id));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, id]);
    }
  };
  
  const resetFilters = () => {
    setSelectedSortBy('recommended');
    setSelectedPriceRanges([]);
    setShowPromo(false);
    setShowNew(false);
  };
  
  const applyFilters = () => {
    // Here you would apply the filters to your actual data
    onClose();
  };
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filtrar</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={theme.colors.text.primary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ordenar por</Text>
              {filterOptions.sortBy.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionRow}
                  onPress={() => setSelectedSortBy(option.id)}
                >
                  <View style={styles.radioContainer}>
                    <View 
                      style={[
                        styles.radioOuter,
                        selectedSortBy === option.id && styles.radioOuterSelected
                      ]}
                    >
                      {selectedSortBy === option.id && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                    <Text style={styles.optionText}>{option.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Faixa de Preço</Text>
              {filterOptions.priceRange.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionRow}
                  onPress={() => togglePriceRange(option.id)}
                >
                  <View style={styles.checkboxContainer}>
                    <View 
                      style={[
                        styles.checkbox,
                        selectedPriceRanges.includes(option.id) && styles.checkboxSelected
                      ]}
                    >
                      {selectedPriceRanges.includes(option.id) && (
                        <View style={styles.checkboxInner} />
                      )}
                    </View>
                    <Text style={styles.optionText}>{option.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Outros Filtros</Text>
              
              <View style={styles.switchRow}>
                <Text style={styles.optionText}>Mostrar apenas promoções</Text>
                <Switch
                  value={showPromo}
                  onValueChange={setShowPromo}
                  trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary + '80' }}
                  thumbColor={showPromo ? theme.colors.primary : '#f4f3f4'}
                  ios_backgroundColor={theme.colors.gray[300]}
                />
              </View>
              
              <View style={styles.switchRow}>
                <Text style={styles.optionText}>Mostrar apenas novidades</Text>
                <Switch
                  value={showNew}
                  onValueChange={setShowNew}
                  trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary + '80' }}
                  thumbColor={showNew ? theme.colors.primary : '#f4f3f4'}
                  ios_backgroundColor={theme.colors.gray[300]}
                />
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={resetFilters}
            >
              <Text style={styles.resetButtonText}>Limpar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={applyFilters}
            >
              <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  modalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: theme.colors.text.primary,
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    paddingHorizontal: 16,
    maxHeight: '70%',
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  optionRow: {
    paddingVertical: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioOuterSelected: {
    borderColor: theme.colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: theme.colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  checkboxInner: {
    color: '#fff',
    fontSize: 12,
  },
  optionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.gray[200],
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: 8,
    marginRight: 8,
  },
  resetButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  applyButton: {
    flex: 2,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  applyButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#fff',
  },
});