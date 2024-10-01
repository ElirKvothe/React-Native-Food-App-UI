import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField'; // InputField bileşenini içeri aktarıyoruz

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  // Animasyonlar için referanslar
  const emailAnim = useRef(new Animated.Value(-500)).current; // Soldan gelecek
  const passwordAnim = useRef(new Animated.Value(500)).current; // Sağdan gelecek

  useEffect(() => {
    // Animasyonları sırayla tetikleyelim
    Animated.sequence([
      Animated.timing(emailAnim, {
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

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Login successful:', data);
        // Login başarılıysa ana ekrana yönlendirme
        navigation.push('HomeScreen');
      } else {
        console.error('Login failed:', data.message);
        alert('Invalid username or password'); // Hatalı giriş durumunda mesaj göster
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
      <Text style={styles.title}>Welcome !</Text>

      {/* Email input (Animasyonlu) */}
      <Animated.View style={{ transform: [{ translateX: emailAnim }] }}>
        <InputField
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
        />
      </Animated.View>
      
      {/* Şifre input (Animasyonlu) */}
      <Animated.View style={{ transform: [{ translateX: passwordAnim }] }}>
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </Animated.View>

      {/* Giriş butonu */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Alt seçenekler */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? <Text style={styles.footerLink} onPress={() => navigation.push('Signup')}>Sign up</Text></Text>
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
    marginBottom: 75,
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

export default LoginScreen;
