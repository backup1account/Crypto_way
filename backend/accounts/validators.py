from django.core.exceptions import ValidationError


def validate_password(value):
    if len(value) < 5:
        raise ValidationError("Password must contain at least 5 characters.")
    elif not any(ch.isdigit() for ch in value):
        raise ValidationError("Password must contain at least one number.")
    else:
        return value
