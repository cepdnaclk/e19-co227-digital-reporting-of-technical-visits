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
}
