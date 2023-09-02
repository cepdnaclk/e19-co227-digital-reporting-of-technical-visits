import 'package:flutter/material.dart';
import 'package:visitlog/Widgets/button_loading_widget.dart';
import 'package:visitlog/services/auth_service.dart';
import 'task_screen.dart';
import 'package:form_field_validator/form_field_validator.dart';

class LoginScreen extends StatefulWidget {
  LoginScreen({super.key});
  static String id = 'login_screen';

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool passwordVisible = false;
  late String email;
  late String password;

  final _formkey = GlobalKey<FormState>();
  bool _isLoading = false;
  bool _isLoadingG = false;

  @override
  void initState() {
    super.initState();
    passwordVisible = true;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Column(
        children: [
          SizedBox(
            height: MediaQuery.of(context).size.height / 10,
            width: double.infinity,
          ),
          SizedBox(
            width: double.infinity,
            height: MediaQuery.of(context).size.height / 4.5,
            child: Image.asset('assets/images/214939.jpg'),
          ),
          Form(
            key: _formkey,
            child: Expanded(
              child: Container(
                width: double.infinity,
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(30),
                    topRight: Radius.circular(30),
                  ),
                ),
                child: Padding(
                  padding: EdgeInsets.symmetric(
                      vertical: MediaQuery.of(context).size.height / 20,
                      horizontal: MediaQuery.of(context).size.width / 15),
                  child: SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Email',
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(18),
                          ),
                          child: TextFormField(
                            validator: MultiValidator([
                              RequiredValidator(
                                  errorText: 'Enter email address'),
                              EmailValidator(
                                  errorText: 'Please correct email filled'),
                            ]),
                            style: const TextStyle(color: Colors.white),
                            onChanged: (value) {
                              email = value;
                            },
                            decoration: InputDecoration(
                              contentPadding:
                                  EdgeInsets.symmetric(horizontal: 18),
                              filled: true,
                              border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(18)),
                              fillColor: Colors.black87,
                              prefixIcon: const Padding(
                                padding: EdgeInsetsDirectional.only(
                                    start: 20, end: 20),
                                child: Icon(
                                  Icons.email,
                                  color: Colors.white,
                                ),
                              ),
                              hintText: '  Enter email address',
                              hintStyle: TextStyle(color: Colors.white),
                            ),
                            textAlignVertical: TextAlignVertical.center,
                          ),
                        ),
                        SizedBox(
                            height: MediaQuery.of(context).size.height / 45),
                        const Text(
                          'Password',
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(18),
                          ),
                          child: TextFormField(
                            obscureText: passwordVisible,
                            style: TextStyle(color: Colors.white),
                            onChanged: (value) {
                              password = value;
                            },
                            decoration: InputDecoration(
                              contentPadding:
                                  EdgeInsets.symmetric(horizontal: 18),
                              filled: true,
                              border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(18.0)),
                              fillColor: Colors.black87,
                              prefixIcon: const Padding(
                                padding: EdgeInsetsDirectional.only(
                                    start: 20, end: 20),
                                child: Icon(
                                  Icons.lock,
                                  color: Colors.white,
                                ),
                              ),
                              suffixIcon: Padding(
                                padding: const EdgeInsetsDirectional.only(
                                    start: 20, end: 20),
                                child: IconButton(
                                  icon: Icon(
                                    passwordVisible
                                        ? Icons.visibility
                                        : Icons.visibility_off,
                                    color: Colors.white60,
                                  ),
                                  onPressed: () {
                                    setState(
                                      () {
                                        passwordVisible = !passwordVisible;
                                      },
                                    );
                                  },
                                ),
                              ),
                              hintText: '  Enter password',
                              hintStyle: TextStyle(color: Colors.white),
                            ),
                            textAlignVertical: TextAlignVertical.center,
                          ),
                        ),
                        SizedBox(
                            height: MediaQuery.of(context).size.height / 20),
                        ElevatedButton(
                          onPressed: () async {
                            if (_formkey.currentState!.validate()) {
                              setState(() {
                                _isLoading = true;
                              });
                              try {
                                final newUser = await AuthService()
                                    .signInwithEmail(email, password);
                                if (newUser != null) {
                                  setState(() {
                                    _isLoading = false;
                                  });
                                  // ignore: use_build_context_synchronously
                                  Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) => TaskScreen()));
                                }
                              } catch (e) {
                                print("Error in firebase authentication \n $e");
                                setState(() {
                                  _isLoading = false;
                                });
                              }
                            }
                          },
                          style: ElevatedButton.styleFrom(
                              shape: const StadiumBorder(),
                              backgroundColor: Color.fromARGB(255, 76, 98, 109)),
                          child: Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(30),
                              color: const Color.fromARGB(255, 76, 98, 109),
                            ),
                            child: Center(
                              child: Padding(
                                padding:
                                    const EdgeInsets.symmetric(vertical: 8),
                                child: _isLoading
                                    ? const ButtonLoadingWidget()
                                    : const Text(
                                        ' Log In',
                                        style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 28,
                                          fontWeight: FontWeight.w500,
                                        ),
                                      ),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 35),
                        const Center(
                          child: Padding(
                            padding: EdgeInsets.all(10.0),
                            child: Row(
                              children: [
                                Expanded(
                                    child: Divider(
                                  color: Colors.black45,
                                  thickness: 2,
                                )),
                                Padding(
                                  padding: EdgeInsets.all(10.0),
                                  child: Text(
                                    'OR',
                                    style: TextStyle(
                                      color: Colors.black54,
                                      fontSize: 20,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                ),
                                Expanded(
                                    child: Divider(
                                  color: Colors.black45,
                                  thickness: 2,
                                )),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 20),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            FloatingActionButton.extended(
                              onPressed: () async {
                                setState(() {
                                  _isLoadingG = true;
                                });
                                try {
                                  final gUser =
                                      await AuthService().signInWithGoogle();
                                  if (gUser != null) {
                                    setState(() {
                                      _isLoadingG = false;
                                    });
                                    // ignore: use_build_context_synchronously
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) =>
                                                TaskScreen()));
                                  }
                                } catch (e) {
                                  print("Error in google authentication \n $e");
                                  setState(() {
                                    _isLoadingG = false;
                                  });
                                }

                                // ignore: use_build_context_synchronously
                              },
                              label: _isLoadingG
                                  ? const ButtonLoadingWidget()
                                  : const Text(
                                      'Sign-In with Google',
                                      style: TextStyle(
                                        color: Colors.black54,
                                        fontWeight: FontWeight.w700,
                                      ),
                                      textScaleFactor: 1.1,
                                    ),
                              icon: Padding(
                                padding: const EdgeInsets.all(2),
                                child: _isLoadingG
                                    ? null
                                    : Image.asset(
                                        'assets/images/google.png',
                                        height: 30,
                                        width: 30,
                                      ),
                              ),
                              backgroundColor:
                                  Color.fromARGB(255, 213, 233, 245),
                            ),

                            // GestureDetector(
                            //   onTap: () {
                            //     AuthService().signInWithGoogle();
                            //  },
                            //   child: Container(
                            //     width: 60,
                            //     height: 60,
                            //     padding: const EdgeInsets.all(5),
                            //     decoration: BoxDecoration(
                            //       borderRadius: BorderRadius.circular(15),
                            //       color: Colors.white38,
                            //     ),
                            //     child: Image.asset('assets/images/google.png'),
                            //   ),
                            // ),
                            // const SizedBox(width: 12),
                            // GestureDetector(
                            //     onTap: () {
                            //       Navigator.push(
                            //           context,
                            //           MaterialPageRoute(
                            //               builder: (context) =>
                            //                   const SecondScreen()));
                            //     },
                            //     child: Container(
                            //       height: 60,
                            //       alignment: Alignment.center,
                            //       decoration: BoxDecoration(
                            //         borderRadius: BorderRadius.circular(15),
                            //         color: Colors.white38,
                            //       ),
                            //       child: const Text(
                            //         'Google',
                            //         style: TextStyle(
                            //           color: Colors.black45,
                            //           fontSize: 25,
                            //           // fontWeight: FontWeight.w500,
                            //         ),
                            //       ),
                            //     ))
                            // GestureDetector(
                            //   onTap: () {
                            //     Navigator.push(
                            //         context,
                            //         MaterialPageRoute(
                            //             builder: (context) =>
                            //                 const SecondScreen()));
                            //   },
                            //   child: Container(
                            //     width: 60,
                            //     height: 60,
                            //     padding: const EdgeInsets.all(5),
                            //     decoration: BoxDecoration(
                            //       borderRadius: BorderRadius.circular(15),
                            //       color: Colors.white38,
                            //     ),
                            //     child: Image.asset('assets/images/facebook.png'),
                            //   ),
                            // ),
                          ],
                        )
                      ],
                    ),
                  ),
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
