document.addEventListener('DOMContentLoaded', () => {
      const btnMusa = document.getElementById('btnMusa');
      const btnVoz = document.getElementById('btnVoz');
      const dropdown = document.getElementById('audioDropdown');
      const arrowMusa = document.getElementById('arrowMusa');
      const arrowVoz = document.getElementById('arrowVoz');

      function closeDropdown() {
        dropdown.classList.add('hidden');
        btnMusa.className = "py-2.5 text-zinc-500 border-b-[3px] border-transparent flex items-center justify-center space-x-1 relative transition-all duration-150";
        arrowMusa.classList.remove('rotate-180', 'text-cyan-400');
        btnVoz.className = "py-2.5 text-zinc-500 border-b-[3px] border-transparent flex items-center justify-center space-x-1 relative transition-all duration-150";
        arrowVoz.classList.remove('rotate-180', 'text-cyan-400');
      }

      function toggleMenu(targetBtn, arrow, sideClass) {
        const isCurrentlyOpen = !dropdown.classList.contains('hidden') && dropdown.dataset.activeBtn === targetBtn.id;
        closeDropdown();

        if (!isCurrentlyOpen) {
          targetBtn.className = "py-2.5 text-cyan-400 border-b-[3px] border-cyan-400 bg-cyan-950/20 flex items-center justify-center space-x-1 relative transition-all duration-150";
          arrow.classList.add('rotate-180', 'text-cyan-400');
          dropdown.className = `absolute top-full z-50 mt-1 w-52 bg-[#121214] border border-zinc-800 rounded-2xl p-1.5 shadow-2xl ${sideClass}`;
          dropdown.dataset.activeBtn = targetBtn.id;
          dropdown.classList.remove('hidden');
        }
      }

      btnMusa.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu(btnMusa, arrowMusa, 'left-4');
      });

      btnVoz.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu(btnVoz, arrowVoz, 'right-4');
      });

      document.addEventListener('click', () => {
        closeDropdown();
      });

      // Avanzado
      const avanzadoToggle = document.getElementById('avanzadoToggle');
      const avanzadoContent = document.getElementById('avanzadoContent');
      const avanzadoArrow = document.getElementById('avanzadoArrow');
      avanzadoToggle.addEventListener('click', () => {
        const isHidden = avanzadoContent.classList.toggle('hidden');
        avanzadoArrow.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
      });

      // Contador de canciones
      let songs = 2;
      const songsCountEl = document.getElementById('songsCount');
      document.getElementById('incSongs').addEventListener('click', () => { if(songs < 10) { songs++; songsCountEl.textContent = songs; } });
      document.getElementById('decSongs').addEventListener('click', () => { if(songs > 1) { songs--; songsCountEl.textContent = songs; } });

      // Slider Mutar
      function initTickSlider(containerId, valueLabelId, initialVal, activeColorClass) {
        const container = document.getElementById(containerId);
        const label = document.getElementById(valueLabelId);
        if(!container) return;
        const totalTicks = 16;

        function render(percent) {
          container.innerHTML = '';
          const activeCount = Math.round((percent / 100) * (totalTicks - 1));
          label.textContent = `${percent}%`;
          container.setAttribute('data-val', percent);

          for (let i = 0; i < totalTicks; i++) {
            const tick = document.createElement('div');
            if (i === activeCount) {
              tick.className = 'tick-bar thumb';
            } else if (i < activeCount) {
              tick.className = `tick-bar active ${activeColorClass}`;
            } else {
              tick.className = 'tick-bar';
            }
            container.appendChild(tick);
          }
        }

        function updateFromPointer(e) {
          const rect = container.getBoundingClientRect();
          const clientX = e.touches ? e.touches[0].clientX : e.clientX;
          let offsetX = clientX - rect.left;
          offsetX = Math.max(0, Math.min(offsetX, rect.width));
          let percent = Math.round((offsetX / rect.width) * 100);
          percent = Math.round(percent / 5) * 5;
          render(percent);
        }

        let isDragging = false;
        container.addEventListener('pointerdown', (e) => {
          isDragging = true;
          container.setPointerCapture(e.pointerId);
          updateFromPointer(e);
        });
        container.addEventListener('pointermove', (e) => { if (isDragging) updateFromPointer(e); });
        container.addEventListener('pointerup', () => { isDragging = false; });

        render(initialVal);
      }

      initTickSlider('sliderMutar', 'valMutar', 50, 'bg-cyan-400');
    });