from django.core.exceptions import ValidationError


class CustomPasswordValidator():
    def __init__(self, max_length=128):
        self.max_length = max_length

    def validate(self, value, user=None):
        if len(value) > self.max_length:
            raise ValidationError("Password cannot contain more than 128 characters.")
        if not any(ch.isdigit() for ch in value):
            raise ValidationError("Password must contain at least one number.")

    def get_help_text(self):
        return "Password must contain at least 5 characters and one number, \
            but also cannot have more than 128 characters."


