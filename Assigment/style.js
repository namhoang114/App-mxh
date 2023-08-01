import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  textinputlogin: {
    flexDirection: 'row', 
    borderBottomColor: '#ccc', 
    borderBottomWidth: 2, 
    marginBottom: 25
  },
  quenmatkhau: {
    color: '#ad40af', 
    fontWeight: '700'
  },
  btnlogin: {
    backgroundColor: '#ad40af',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30
  },
  logintxt: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff'
  },
  facebook: {
    borderColor: '#ddd', 
    borderWidth: 2, 
    borderRadius: 10, 
    paddingHorizontal: 30, 
    paddingVertical: 10
  },
  hearder: {
    height: '10%',
    backgroundColor: '#ad40af',
    justifyContent: 'center'
  },
  hearder1: {
    height: '90%',
    backgroundColor: '#ad40af',
    justifyContent: 'center'
  },
  status: {
    height: '80%',
    borderBottomWidth: 2
  },
  submit: {
    backgroundColor: '#ad40af',
    margin: 10,
    width: 80,
    borderRadius: 6,
  },
  khungpost: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    borderTopWidth: 3,
    backgroundColor: '#F5EAEA'
  },
  itemtxt: {
    fontSize: 18
  }
});

export default styles;