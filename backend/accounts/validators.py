from django.core.exceptions import ValidationError


class CustomPasswordValidator():
    def __init__(self, max_length=128, min_length=5):
        self.max_length = max_length
        self.min_length = min_length

    def validate(self, value, user=None):
        if len(value) > self.max_length:
            raise ValidationError(f'Hasło może zawierać maksymalnie ${self.max_length} znaków.')
        if len(value) < self.min_length:
            raise ValidationError(f'Hasło musi zawierać co najmniej ${self.min_length} znaków.')
        if not any(ch.isdigit() for ch in value):
            raise ValidationError('Hasło musi zawierać przynajmniej 1 liczbę.')

    def get_help_text(self):
        return f"Hasło musi zawierać co najmniej ${self.min_length} znaków, w tym jedną liczbę, \
            może być dłuższe niż na ${self.max_length} znaków."

