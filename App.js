import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const OP_NONE = '';
const OP_ADD = '+';
const OP_SUB = '-';
const OP_MUL = '*';
const OP_DIV = '/';

export default function App() {
  const [subtotal, setSubtotal] = useState(0);
  const [last, setLast] = useState(0);
  const [op, setOp] = useState(OP_NONE);
  const [display, setDisplay] = useState('');

  const allClear = () => {
    setSubtotal(0);
    setLast(0);
    setOp(OP_NONE);
    setDisplay('');
  };

  const pushDigit = (digit) => {
    setDisplay(display + digit);
  };

  const pushPoint = () => {
    if (display.indexOf('.') == -1) {
      if (display == '') {
        setDisplay('0.');
      } else {
        setDisplay(display + '.');
      }
    }
  };

  const pushOp = (newOp) =>{
    setLast(Number(display));
    if(op == OP_NONE){
      setSubtotal(Number(display));
      setDisplay('')
    }
    setOp(newOp);
  }

  const onEqualsPress = () => {
    if (display != '') {
      value = Number(display);
    } else {
      value = last;
    }
    if (op != OP_NONE) {
      switch (op) {
        case OP_ADD:
          setSubtotal(subtotal + value);
          break;
        case OP_SUB:
          setSubtotal(subtotal - value);
          break;
        case OP_MUL:
          setSubtotal(subtotal * value);
          break;
        case OP_DIV:
          setSubtotal(subtotal / value);
          break;
        default:
          console.error('this should not happen');
      }
      setLast(value);
      setDisplay('');
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Text style={styles.display}>{display != '' ? display : subtotal}</Text>
      <View style={styles.keypad}>
        <View style={styles.keypadRow}>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonWhite, { flex: 3 }]}
            onPress={() => {
              allClear();
            }}
          >
            <Text style={styles.keypadText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonOrange]}
            onPress={() => pushOp(OP_DIV)}
          >
            <Text style={styles.keypadText}>/</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keypadRow}>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonWhite]}
            onPress={() => pushDigit(7)}
          >
            <Text style={styles.keypadText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonWhite]}
            onPress={() => pushDigit(8)}
          >
            <Text style={styles.keypadText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonWhite]}
            onPress={() => pushDigit(9)}
          >
            <Text style={styles.keypadText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonOrange]}
            onPress={() => pushOp(OP_MUL)}
          >
            <Text style={styles.keypadText}>*</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keypadRow}>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonWhite]}
            onPress={() => pushDigit(4)}
          >
            <Text style={styles.keypadText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonWhite]}
            onPress={() => pushDigit(5)}
          >
            <Text style={styles.keypadText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonWhite]}
            onPress={() => pushDigit(6)}
          >
            <Text style={styles.keypadText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonOrange]}
            onPress={() => pushOp(OP_SUB)}
          >
            <Text style={styles.keypadText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keypadRow}>
        <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonWhite]}
            onPress={() => pushDigit(1)}
          >
            <Text style={styles.keypadText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonWhite]}
            onPress={() => pushDigit(2)}
          >
            <Text style={styles.keypadText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonWhite]}
            onPress={() => pushDigit(3)}
          >
            <Text style={styles.keypadText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonOrange]}
            onPress={() => pushOp(OP_ADD)}
          >
            <Text style={styles.keypadText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keypadRow}>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonWhite, { flex: 2 }]}
          >
            <Text style={styles.keypadText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonWhite]}
            onPress={() => pushPoint()}
          >
            <Text style={styles.keypadText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keypadButton, styles.keypadButtonOrange]}
            onPress={() => onEqualsPress()}
          >
            <Text style={styles.keypadText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: '#2d2d2d',
  },
  display: {
    textAlign: 'right',
    fontSize: 72,
    color: '#ffffff',
    marginHorizontal: 10
  },
  keypad: {
    padding: 3,
    height: '60%',
    alignItems: 'stretch',
  },
  keypadRow: {
    flex: 1,
    flexDirection: 'row',
  },
  keypadButton: {
    flex: 1,
    margin: 3,
    justifyContent: 'center',
  },
  keypadButtonWhite: {
    backgroundColor: '#e9e9e9',
  },
  keypadButtonOrange: {
    backgroundColor: '#e28d0d',
  },
  keypadText: {
    fontSize: 40,
    textAlign: 'center',
  },
});
