import 'package:cloud_firestore/cloud_firestore.dart';

class UserModel {
  final String? id;
  final String? name;
  final String? email;
  final String? phoneNo;

  const UserModel({
    this.id,
    required this.email,
    required this.name,
    required this.phoneNo,
  });

  toJson() {
    return {
      "name": name,
      "email": email,
      "phone": phoneNo,
    };
  }

  factory UserModel.fromSnapshot(
      DocumentSnapshot<Map<String, dynamic>> document) {
    final data = document.data()!;
    return UserModel(
        id: document.id,
        email: data["emal"],
        name: data["name"],
        phoneNo: data["phoneNo"]);
  }
}


