import 'package:flutter/material.dart';
import 'package:visitlog/services/auth_service.dart';
import 'second_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  static String id = 'login_screen';

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
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
          Expanded(
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
                          color: Colors.black87,
                        ),
                        child: const Padding(
                          padding: EdgeInsets.symmetric(horizontal: 8),
                          child: TextField(
                            style: TextStyle(color: Colors.white),
                            decoration: InputDecoration(
                              border: InputBorder.none,
                              prefixIcon: Icon(
                                Icons.email,
                                color: Colors.white,
                              ),
                              hintText: '  Email',
                              hintStyle: TextStyle(color: Colors.white),
                            ),
                            textAlignVertical: TextAlignVertical.center,
                          ),
                        ),
                      ),
                      SizedBox(height: MediaQuery.of(context).size.height / 45),
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
                          color: Colors.black87,
                        ),
                        child: const Padding(
                          padding: EdgeInsets.symmetric(horizontal: 8),
                          child: TextField(
                            obscureText: true,
                            style: TextStyle(color: Colors.white),
                            decoration: InputDecoration(
                              border: InputBorder.none,
                              prefixIcon: Icon(
                                Icons.lock,
                                color: Colors.white,
                              ),
                              hintText: '  Password',
                              hintStyle: TextStyle(color: Colors.white),
                            ),
                            textAlignVertical: TextAlignVertical.center,
                          ),
                        ),
                      ),
                      SizedBox(height: MediaQuery.of(context).size.height / 20),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.pushNamed(
                              context,
                              SecondScreen.id);
                        },
                        style: ElevatedButton.styleFrom(
                            shape: const StadiumBorder()),
                        child: Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(30),
                            color: Colors.blueGrey,
                          ),
                          child: const Center(
                            child: Padding(
                              padding: EdgeInsets.all(10.0),
                              child: Text(
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
                        child: Text(
                          '- Or Sign In with -',
                          style: TextStyle(
                            color: Colors.black87,
                            fontSize: 20,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          FloatingActionButton.extended(
                            onPressed: () async{
                              await AuthService().signInWithGoogle();
                              // ignore: use_build_context_synchronously
                              Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) =>
                                            SecondScreen()));
                            },
                            label: const Text('Continue with Google', style: TextStyle(color: Colors.black45), textScaleFactor: 1.05,),
                            icon: Padding(
                              padding: const EdgeInsets.all(0),
                              child: Image.asset(
                                'assets/images/google.png',
                                height: 35,
                                width: 35,
                              ),
                            ),
                            backgroundColor: const Color.fromARGB(255, 227, 240, 248),
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
          )
        ],
      ),
    );
  }
}
