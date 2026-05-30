// Confirmacao adicional antes de cancelar inscricoes (progressive enhancement)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[action*="/cancelar"]').forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!confirm('Tem certeza que deseja cancelar esta inscricao?')) {
        e.preventDefault();
      }
    });
  });
});
