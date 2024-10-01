import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField'; // InputField bileşenini içeri aktarıyoruz

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  // Animasyonlar için referanslar
  const nameAnim = useRef(new Animated.Value(-500)).current; // Soldan gelecek
  const surnameAnim = useRef(new Animated.Value(500)).current; // Sağdan gelecek
  const usernameAnim = useRef(new Animated.Value(-500)).current; // Soldan gelecek
  const passwordAnim = useRef(new Animated.Value(500)).current; // Sağdan gelecek

  useEffect(() => {
    // Animasyonları sırayla tetikleyelim
    Animated.sequence([
      Animated.timing(nameAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(surnameAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(usernameAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(passwordAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignup = async () => {
    if (!username || !password || !name || !surname) {
      alert('All fields are required');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          surname,
          username,
          password,
        }),
      });
      const data = await response.json();
  
      if (response.ok) {
        console.log('User created:', data);
        navigation.push('Login'); // Kayıt başarılıysa login ekranına yönlendirme
      } else {
        console.error('Signup failed:', data.message);
        alert('Signup failed, please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred, please try again.');
    }
  };  

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image 
        source={require('../assets/images/foodlogo.png')} 
        style={styles.logo} 
      />

      {/* Başlık */}
      <Text style={styles.title}>Create an Account</Text>

      {/* Name input (Animasyonlu) */}
      <Animated.View style={{ transform: [{ translateX: nameAnim }] }}>
        <InputField
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </Animated.View>

      {/* Surname input (Animasyonlu) */}
      <Animated.View style={{ transform: [{ translateX: surnameAnim }] }}>
        <InputField
          placeholder="Surname"
          value={surname}
          onChangeText={setSurname}
        />
      </Animated.View>

      {/* Username input (Animasyonlu) */}
      <Animated.View style={{ transform: [{ translateX: usernameAnim }] }}>
        <InputField
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </Animated.View>

      {/* Password input (Animasyonlu) */}
      <Animated.View style={{ transform: [{ translateX: passwordAnim }] }}>
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </Animated.View>

      {/* Kayıt ol butonu */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      {/* Alt seçenekler */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? <Text style={styles.footerLink} onPress={() => navigation.push('Login')}>Login</Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFB600',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  footerLink: {
    color: '#FFB600',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
