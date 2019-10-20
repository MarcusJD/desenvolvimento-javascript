		
				 /*var peso = document.querySelector("#primeiro-paciente")
									.querySelector(".info-peso")
									.textContent;
									
				 var altura = document.querySelector("#primeiro-paciente")
									  .querySelector(".info-altura")
									  .textContent;
									  
				 var imc = document.querySelector("#primeiro-paciente")
								   .querySelector(".info-imc");
					
			
				imc.textContent = peso/(altura*altura);
				

				console.log(imc);
				console.log(pacientes);*/
				
				//============================================================================//
				//                         *Preenchemento do IMC*	   						  //
				//============================================================================//
				
				/**
				* querySelectorAll obtém todos os objetos referente a classe paciente.
				*/
				var pacientes = document.querySelectorAll(".paciente"); 
				
				for( i = 0; i < pacientes.length; i++ )
				{
				    var peso = pacientes[i].querySelector(".info-peso")
										   .textContent;
										   
										   pacientes[i].style.backgroundColor = "lightcoral";
										   
										   pacientes[i].classList.add("paciente-letra");//classe no css, adiciona uma classe no objeto (classList.add)
										   
				    var altura = pacientes[i].querySelector(".info-altura")
										     .textContent;		 

				    var imc = pacientes[i].querySelector(".info-imc");		
					
					var imcValue = calculaIMC(peso,altura);
					
					imc.textContent = imcValue.toFixed(2);
				}
				//============================================================================//
				//                          *Evento do botão*	     						  //
				//============================================================================//
				
				var botao = document.querySelector("#adicionar-paciente");
				
				/**
				* addEventListener escuta os eventos (no caso o click)
				*/
				botao.addEventListener( "click", function(event){
					
					event.preventDefault( );// Evita o carregamento da página e o envio do formulário ao clicar no botão
				
					var form        = document.querySelector("#form-add"); //obtendo o form.
					var tbPacientes = document.querySelector("#tabela-pacientes");
					
					/*
					* Populando objeto paciente.
					*/
					var paciente = getPaciente( form );
					
					/*
					* Validação
					*/					
					var erros = validaPaciente( paciente );
					
					if( erros.length > 0 )
					{
						exibeMensagemErro( erros );
						
					    return;
					}
					
					pacienteTr = montaTR( paciente ); 
					
					//Adicionando a tabela no TBody
					tbPacientes.appendChild( pacienteTr );
					
					var ulErros = document.querySelector( "#lista-erros" );
					
					ulErros.innerHTML = ""; // "Zerar" a ul para adicionar a validação atualizada.
					
					form.reset();

				});
			
				
				//============================================================================//
				//                          *Funções*	     			        			  //
				//============================================================================//
				
				/*
				* Calcula o IMC
				*/
				function calculaIMC( peso, altura )
				{
					return peso/(altura*altura);
				}
									
				/*
				* Obtendo valores do form através do name.
				*/
				function getPaciente( form )
				{

					var paciente = {
						
						nome:         form.nome.value,
						peso:         form.peso.value,
						altura:       form.altura.value,
						gordCorporal: form.gordura.value,
						imc:          calculaIMC(form.peso.value, form.altura.value)
					}
					
					return paciente;
				}
				
				/*
				* Monta a TR
				*/
				function montaTR( paciente )
				{
					var pacienteTr = document.createElement("tr"); //criando uma TR
						
					var nomeTd         = document.createElement("td"); //criando uma TD
					var pesoTd         = document.createElement("td"); //criando uma TD
					var alturaTd       = document.createElement("td"); //criando uma TD
					var gordCorporalTd = document.createElement("td"); //criando uma TD
					var imcTd          = document.createElement("td"); //criando uma TD
				
					nomeTd.textContent         = paciente.nome;
					pesoTd.textContent         = paciente.peso;
					alturaTd.textContent       = paciente.altura;
					gordCorporalTd.textContent = paciente.gordCorporal;
					imcTd.textContent          = paciente.imc;
					
					/**
					* appendChild adiciona elementos filhos( no caso, adicionando as TD's na TR)
					*/
					pacienteTr.appendChild( nomeTd         );
                    pacienteTr.appendChild( pesoTd         );
					pacienteTr.appendChild( alturaTd       );
					pacienteTr.appendChild( gordCorporalTd );
					pacienteTr.appendChild( imcTd          );
					
					pacienteTr.classList.add("paciente");
					pacienteTr.classList.add("paciente-letra");
					pacienteTr.style.background = "lightcoral";
					
					return pacienteTr;
				}
				
				/*
				* Valida os pacientes
				*/
				function validaPaciente( paciente ) 
				{
					var erros = [];
					
					if( !validaPeso( paciente.peso ) )
						erros.push( "Peso Inválido!" );
					
					if( !validaAltura( paciente.altura ) )
					    erros.push( "Altura Inválida!" );
					
					if( !validaNome( paciente.nome ) )
					    erros.push( "O nome do paciente não pode ficar em branco!" );
					
					return erros;
				}
				
				function validaNome( nome )
				{
					if( nome.length != 0 )
						return true;
					else
						return false;
				}				
				
				function validaPeso( peso ) 
				{
					if( peso >= 0 && peso < 1000 )
						return true;
					else
						return false;
				}
				
				function validaAltura( altura )
				{
					if( altura >= 0 && altura <= 3.0 )
						return true;
					else
						return false;
				}
				
				function exibeMensagemErro( erros )
				{		
					var ulErros = document.querySelector( "#lista-erros" );
					
					ulErros.innerHTML = ""; // "Zerar" a ul para adicionar a validação atualizada.
					
					erros.forEach( function( erro )
					{
						li = document.createElement( "li" );
						
						li.textContent = erro;
													
						li.style.color = "red";
							
						ulErros.appendChild( li );
					})
				}