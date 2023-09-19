import 'package:cloud_firestore/cloud_firestore.dart';

class TaskModel {
  final String? id;
  final String? company;
  final String? title;
  final String? address;
  final String? description;
  final String? startDate;
  final String? email;
  final bool? isArrived;
  final bool? isVerified;

  const TaskModel({
    this.id,
    required this.company,
    required this.title,
    required this.address,
    required this.description,
    required this.startDate,
    required this.email,
    required this.isArrived,
    required this.isVerified,
  });

  toJson() {
    return {
      "company": company,
      "address": address,
      "title": title,
      "description": description,
      "email": email,
      "startDate": startDate,
      "isArrived": isArrived,
      "isVerified": isVerified,
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
      email: data["email"],
      isArrived: data["isArrived"],
      isVerified: data['isVerified'],
    );
  }
}
