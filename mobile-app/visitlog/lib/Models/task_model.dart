import 'package:cloud_firestore/cloud_firestore.dart';

class TaskModel {
  final String? id;
  final String? company;
  final String? title;
  final String? address;
  final String? description;
  final String? startDate;
  final String? email;

  const TaskModel({
    this.id,
    required this.company,
    required this.title,
    required this.address,
    required this.description,
    required this.startDate,
    required this.email,
  });

  toJson() {
    return {
      "company": company,
      "address": address,
      "title": title,
      "description": description,
      "email": email,
      "startDate": startDate,
    };
  }

  factory TaskModel.fromSnapshot(
      DocumentSnapshot<Map<String, dynamic>> document) {
    final data = document.data()!;
    return TaskModel(
        company: data["company"],
        title: data["title"],
        address: data["address"],
        description: data["description"],
        startDate: data["startDate"].toString(),
        email: data["email"]);
  }
}
